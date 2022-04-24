#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <math.h>

// Function Prototypes
short IndexCalculator(string);

int main(void)
{
    // Receive a text from the user 
    string text = get_string("Text: ");

    // Calculates the Coleman-Liau index
    short index = IndexCalculator(text);
    
    // Print the index
    if (index < 1)
    {
        printf("Before Grade 1\n");
    }
    else if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade %i\n", index);    
    }
}

short IndexCalculator(string str)
{
    unsigned int l = 0, w = 1, s = 0;
    for (int i = 0, x = strlen(str); i < x; i++)
    {
        // Counts letters
        if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z'))
        {
            l++;
        }
        
        // Counts words
        if (str[i] == ' ')
        {
            w++;
        }
        
        // Counts sentences 
        if (str[i] == '.' || str[i] == '?'  || str[i] == '!')
        {
            s++;
        }
    }
    
    // Calculate the Coleman-Liau index
    float L = l * (100.0 / w);
    float S = s * (100.0 / w);
    short index = round(0.0588 * L - 0.296 * S - 15.8);
    
    return index;
}
