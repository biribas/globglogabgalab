from cs50 import get_float

# Get the user's input
while True:
    dollars = get_float("Change owed: ")
    if (dollars > 0):
        break

# Convert dollars to cents
cents = round(100 * dollars)

# Number of coins
coins = 0

while cents != 0:
    if cents >= 25:
        cents -= 25
    elif cents >= 10:
        cents -= 10
    elif cents >= 5:
        cents -= 5
    else:
        cents -= 1
    coins += 1

print(coins)