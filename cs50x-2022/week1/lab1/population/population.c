#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int starting_size;
    int ending_size;
    
    // TODO: Prompt for start size
    do
    {
        starting_size = get_int("Start size: ");
    }
    while (starting_size < 9);
    
    // TODO: Prompt for end size
    do
    {
        ending_size = get_int("End size: ");
    }
    while (ending_size < starting_size);
    
    // TODO: Calculate number of years until we reach threshold
    int n = 0;
    while (ending_size > starting_size)
    {
        starting_size += (starting_size / 3) - (starting_size / 4);
        n++;
    }
    
    // TODO: Print number of years
    printf("Years: %i\n", n);
}