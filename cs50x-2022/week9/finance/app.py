import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    shares = db.execute("SELECT symbol, shares FROM shares WHERE id = ?", session["user_id"])
    cash = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]["cash"]
    total = cash

    for share in shares:
        quote = lookup(share["symbol"])
        share["name"] = quote["name"]
        share["price"] = quote["price"]
        total += share["shares"] * quote["price"]

    return render_template("index.html", shares=shares, cash=cash, total=total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        quote = lookup(symbol)

        # Ensure symbol exists
        if not quote:
            return apology("invalid stock’s symbol")

        shares = request.form.get("shares")

        # Ensure number of shares was submitted
        if not shares:
            return apology("most provide number of shares")

        if not shares.isdigit() or float(shares) < 1:
            return apology("must provide a valid number")

        shares = int(shares)
        price = quote["price"]

        # User's amount of money
        cash = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]["cash"]

        purchase_price = shares * price

        # The user don't have enough money
        if cash < purchase_price:
            return apology("you don't have enough money")

        # Number of shares the user alredy bought from this company
        number_of_shares = db.execute("SELECT shares FROM shares WHERE id = ? AND symbol = ?", session["user_id"], quote["symbol"])

        # If the user alredy bought a stock from this company
        if number_of_shares:
            # Update row
            db.execute("UPDATE shares SET shares = ? WHERE id = ? AND symbol = ?",
                       number_of_shares[0]["shares"] + shares, session["user_id"], quote["symbol"])
        else:
            # Create new row
            db.execute("INSERT INTO shares (id, symbol, shares) VALUES (?, ?, ?)", session["user_id"], quote["symbol"], shares)

        # Update the user cash in database
        db.execute("UPDATE users SET cash = ? WHERE id = ?", cash - purchase_price, session["user_id"])

        # Add purchase to the transactions table
        db.execute("INSERT INTO transactions (id, symbol, price, shares, time) VALUES (?, ?, ?, ?, datetime('now'))",
                   session["user_id"], quote["symbol"], price, shares)

        return redirect("/")

    return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    transactions = db.execute("SELECT * FROM transactions WHERE id = ? ORDER BY time DESC", session["user_id"])
    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        username = request.form.get("username")

        # Ensure username was submitted
        if not username:
            return apology("must provide username", 400)

        password = request.form.get("password")

        # Ensure password was submitted
        if not password:
            return apology("must provide password", 400)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", username)

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        session["username"] = rows[0]["username"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        quote = lookup(symbol)

        if not quote:
            return apology("invalid stock’s symbol", 400)

        return render_template("quote-completed.html", quote=quote)

    return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        username = request.form.get("username")

        # Ensure username was submitted
        if not username:
            return apology("must provide username")

        password = request.form.get("password")

        # Ensure password was submitted
        if not password:
            return apology("must provide password")

        confirmation = request.form.get("confirmation")

        # Ensure passwords match
        if password != confirmation:
            return apology("passwords don't match")

        # All usernames registered
        usernames = db.execute("SELECT username FROM users")

        # Ensure username subimited does not exist
        if username.lower() in map(lambda e: e['username'].lower(), usernames):
            return apology("username already exists")

        # Insert the new user into the database
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, generate_password_hash(password))

        return render_template("register-completed.html")

    return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    shares_owned = db.execute("SELECT symbol FROM shares WHERE id = ?", session["user_id"])
    if not shares_owned:
        return apology("you haven't bought any shares yet")

    shares_owned = map(lambda e: e['symbol'], shares_owned)

    if request.method == "POST":
        symbol = request.form.get("symbol")

        # Ensure a valid symbol was submitted
        if not symbol in shares_owned:
            return apology("Select a valid share")

        shares = request.form.get("shares")

        # Ensure number of shares was submitted
        if not shares:
            return apology("most provide number of shares")

        if not shares.isdigit() or float(shares) < 1:
            return apology("must provide a valid number")

        shares = int(shares)

        # Number of shares the user alredy bought from this company
        number_of_shares = db.execute("SELECT shares FROM shares WHERE id = ? AND symbol = ?",
                                      session["user_id"], symbol)[0]["shares"]

        if shares > number_of_shares:
            return apology("you own less shares than that")

        # Update number of shares
        new_number_of_shares = number_of_shares - shares
        if new_number_of_shares == 0:
            db.execute("DELETE FROM shares WHERE id = ? AND symbol = ?", session["user_id"], symbol)
        else:
            db.execute("UPDATE shares SET shares = ? WHERE id = ? AND symbol = ?", new_number_of_shares, session["user_id"], symbol)

        quote = lookup(symbol)

        sold_price = shares * quote["price"]

        # User's amount of money
        cash = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]["cash"]

        # Update the user cash in database
        db.execute("UPDATE users SET cash = ? WHERE id = ?", cash + sold_price, session["user_id"])

        # Add purchase to the transactions table
        db.execute("INSERT INTO transactions (id, symbol, price, shares, time) VALUES (?, ?, ?, ?, datetime('now'))",
                   session["user_id"], quote["symbol"], quote["price"], -shares)

        return redirect("/")

    return render_template("sell.html", shares=shares_owned)


@app.route("/cash", methods=["GET", "POST"])
@login_required
def add_cash():
    """Add money to user"""
    if request.method == "POST":
        cash = request.form.get("cash")

        # Ensure cash was submitted
        if not cash:
            return apology("must provide a value", 403)

        cash = float(cash)

        current_cash = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]["cash"]

        # Update the user cash in database
        db.execute("UPDATE users SET cash = ? WHERE id = ?", current_cash + cash, session["user_id"])

        return render_template("add-cash-completed.html")

    return render_template("add-cash.html")


@app.route("/settings", methods=["GET", "POST"])
def settings():
    if request.method == "POST":
        # Delete account
        db.execute("DELETE FROM users WHERE id = ?", session["user_id"])
        db.execute("DELETE FROM transactions WHERE id = ?", session["user_id"])
        db.execute("DELETE FROM shares WHERE id = ?", session["user_id"])
        return logout()

    return render_template("settings.html")


@app.route("/change-password", methods=["GET", "POST"])
def change_password():
    if request.method == "POST":
        old_password = request.form.get("old password")
        password_hash = db.execute("SELECT hash FROM users WHERE id = ?", session["user_id"])[0]["hash"]

        # Ensure old password was submitted correctly
        if not check_password_hash(password_hash, old_password):
            return apology("old password incorrect", 403)

        new_password = request.form.get("new password")

        # Ensure new password was submitted
        if not new_password:
            return apology("must provide new password", 403)

        confirmation = request.form.get("confirmation")

        # Ensure new password and confirmation match
        if new_password != confirmation:
            return apology("passwords don't match", 403)

        if old_password == new_password:
            return apology("new password must be different from the old one", 403)

        db.execute("UPDATE users SET hash = ? WHERE id = ?", generate_password_hash(new_password), session["user_id"])

        return render_template("change-password-completed.html")

    return render_template("change-password.html")


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
