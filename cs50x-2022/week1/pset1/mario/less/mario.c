#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int height;
    
    // User chooses pyramid height 
    do
    {
        height = get_int("Height: ");
    }
    while (height < 1 || height > 8);
    
    // Lines
    for (short i = 0; i < height; i++)
    {
        // Spaces
        for (short j = 0; j < (height - 1) - i; j++)
        {
            printf(" "); 
        }
        
        // Hashes
        for (short j = 0; j <= i; j++)
        {
            printf("#"); 
        }
        
        // Line feed
        printf("\n");
    }
}