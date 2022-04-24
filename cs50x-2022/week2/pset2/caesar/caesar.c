#include <stdio.h>
#include <stdlib.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>

// Function Prototypes
bool Validate_Key(string key);
string Cipher(string s, int key);

int main(int n, string argv[])
{
    if (n != 2 || !Validate_Key(argv[1]))
    {
        // Error message
        printf("Usage: ./caesar key\n");
        
        // An error has occurred
        return 1;
    }
    else
    {
        // Converts the string to an integer
        int key = atoi(argv[1]);
        
        // Recieves a plaintext from the user
        string text = get_string("plaintext:  ");
        
        // Cipher the text
        text = Cipher(text, key);
        
        // Prints the ciphertext
        printf("ciphertext: %s\n", text);
        
        // No errors
        return 0;
    }
}

bool Validate_Key(string s)
{
    for (short i = 0, n = strlen(s); i < n; i++)
    {
        // If a character of the string is not a number
        if (s[i] < '0' || s[i] > '9')
        {
            return false;
        }
    }
    return true;
}

string Cipher(string s, int key)
{
    for (short i = 0, n = strlen(s); i < n; i++)
    {
        // If the character is an uppercase letter
        if (isupper(s[i]))
        {
            s[i] = 65 + ((s[i] - 65 + key) % 26);
        }
        // If the character is an lowercase letter
        else if (s[i] >= 'a' && s[i] <= 'z')
        {
            s[i] = 97 + ((s[i] - 97 + key) % 26);
        }
    }
    return s;
}