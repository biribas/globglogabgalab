from cs50 import get_string


def main():
    # Receives a text from the user
    text = get_string("Text: ")

    # Gets the Coleman-Liau index
    index = index_calculator(text)

    # Prints the index
    if index < 1:
        print("Before Grade 1")
    elif index >= 16:
        print("Grade 16+")
    else:
        print(f"Grade {index}")


def index_calculator(text):
    letters = 0
    words = 0
    sentences = 0
    last_char = ""

    char_list = [",", ":", ";", "\"", " ", ".", "?", "!"]

    for ch in text:
        # Counts letters
        if ch.isalpha():
            letters += 1
        # Counts words
        if ch in char_list and last_char.isalpha():
            words += 1
        # Counts sentences
        if ch in char_list[5:]:
            sentences += 1

        last_char = ch

    #  Calculates and returns the Coleman-Liau index
    L = letters * (100.0 / words)
    S = sentences * (100.0 / words)

    return round((0.0588 * L) - (0.296 * S) - 15.8)


if __name__ == "__main__":
    main()