#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

// Function Prototypes
bool Validate_Key(int n, string s);
string Cipher(string s, string key);

int main(int argc, string argv[])
{
    // Check number of comand-line argument
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        // An error has ocurred
        return 1;
    }
    // Check the key
    else if (!Validate_Key(argc, argv[1]))
    {
        // An error has ocurred
        return 1;
    }
    // The key is valid
    else
    {
        // Recieves a plaintext from the user
        string text = get_string("plaintext:  ");

        // Cipher the text
        text = Cipher(text, argv[1]);

        // Prints the ciphertext
        printf("ciphertext: %s\n", text);

        // No errors
        return 0;
    }
}

bool Validate_Key(int n, string s)
{
    int length = strlen(s);
    // Check the key length
    if (length != 26)
    {
        printf("Key must contain 26 characters.\n");
        return false;
    }
    else
    {
        // Auxiliary array for key verification
        int array[26] = {0};
        for (short i = 0; i < length; i++)
        {
            // Check if the characters are letters
            if (!((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')))
            {
                printf("Key must only contain alphabetic characters.\n");
                return false;
            }

            // Auxiliary array indexes are incremented by 1
            isupper(s[i]) ? array[90 - s[i]]++ : array[122 - s[i]]++;
        }

        // Check for repeated characters
        for (short i = 0; i < 26; i++)
        {
            // If there are repeated characters in the key, some index of the array will be different from 1
            if (array[i] != 1)
            {
                printf("Key must not contain repeated characters.\n");
                return false;
            }
        }
    }
    return true;
}

string Cipher(string s, string key)
{
    // Put all key characters in uppercase
    for (short i = 0; i < 26; i++)
    {
        key[i] = toupper(key[i]);
    }

    for (short i = 0, n = strlen(s); i < n; i++)
    {
        // If the character is a lowercase letter
        if (s[i] >= 'a' && s[i] <= 'z')
        {
            s[i] = key[s[i] - 97] + 32;
        }

        // If the character is an upercase letter
        else if (s[i] >= 'A' && s[i] <= 'Z')
        {
            s[i] = key[s[i] - 65];
        }
    }
    return s;
}



