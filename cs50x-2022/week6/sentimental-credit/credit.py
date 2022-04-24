from cs50 import get_string


def main():
    number = get_string("Number: ")

    # Count number of digits
    digits = len(number)

    # list that will hold the input
    numbers = []

    # adds the numbers to the list
    for ch in number:
        numbers.append(int(ch))

    # check if the number is valid
    print(verification(digits, numbers))


def verification(digits, numbers):
    # check if the card is valid
    if digits < 13 or digits > 16 or not luhns_algorithm(numbers):
        return "INVALID"
    else:
        # check if the card is AMEX
        if digits == 15 and numbers[0] == 3 and ((numbers[1] == 4) or (numbers[1] == 7)):
            return "AMEX"
        # check if the card is VISA
        elif numbers[0] == 4:
            return "VISA"
        # check if the card is MASTERCARD
        else:
            if numbers[0] == 5:
                for c in range(1, 6):
                    if c == numbers[1]:
                        return "MASTERCARD"
        return "INVALID"


def luhns_algorithm(numbers):
    sum = 0
    last = len(numbers) - 1

    # Luhn's Algorithm steps
    for c in range(last, -1, -2):
        # Starting with the number’s second-to-last digit
        x = 2 * numbers[c - 1] if c - 1 >= 0 else 0
        # Starting with the number’s last digit
        y = numbers[c]

        # Seperate the digits
        if x > 9:
            x = x // 10 + x % 10

        # makes the sum
        sum += x + y

    # If the last digit of the sum is zero
    if sum % 10 == 0:
        return True
    else:
        return False


if __name__ == "__main__":
    main()