from cs50 import get_int


def main():
    # checks the input
    while True:
        height = get_int("Height: ")
        if height > 0 and height < 9:
            break

    # builds the pyramid
    for i in range(height):
        print(" " * (height - 1 - i), end="")
        print("#" * (i + 1), end="")
        print("  ", end="")
        print("#" * (i + 1))


if __name__ == "__main__":
    main()