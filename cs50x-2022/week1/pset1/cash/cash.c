#include <stdio.h>
#include <cs50.h>
#include <math.h>

int main(void)
{   
    // Get the user's input
    float dollars;
    do
    {
        dollars = get_float("Change owed: ");
    }
    while (dollars < 0);
    
    // Convert dollars to cents
    int cents = round(100 * dollars);
    
    // Number of coins
    unsigned short coins = 0;
    
    while (cents != 0)
    {
        if (cents >= 25)
        {
            cents -= 25;   
        }
        else if (cents >= 10)
        {
            cents -= 10;         
        }
        else if (cents >= 5)
        {
            cents -= 5;      
        }
        else
        {
            cents--;      
        }
        coins++;
    }
    printf("%i\n", coins);
}