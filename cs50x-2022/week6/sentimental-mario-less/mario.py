from cs50 import get_int


def main():
    # checks the input
    while True:
        height = get_int("Height: ")
        if height > 0 and height < 9:
            break
    # builds the pyramid
    mario(height, height + 1)


def mario(height, x):
    """Recursive Function that builds the pyramid"""
    if height == 0:
        return
    print(" " * (height - 1), end="")
    print("#" * (x - height))
    mario(height - 1, x)


if __name__ == "__main__":
    main()

