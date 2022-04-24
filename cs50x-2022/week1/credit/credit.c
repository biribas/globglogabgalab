#include <stdio.h>
#include <cs50.h>

// Function Header
bool Verification(int, long);
bool Luhns_Algorithm(long);
long Divisor(short);
string type;

int main(void)
{
    long number = get_long("Number: ");

    short digits = 0;
    long aux = number;

    // Count number of digits
    while (aux != 0)
    {
        aux /= 10;
        digits++;
    }

    // Invalid number of digits or card type
    if (!Verification(digits, number))
    {
        printf("INVALID\n");
    }
    else
    {
        if (Luhns_Algorithm(number))
        {
            printf("%s\n", type);
        }
        else
        {
            printf("INVALID\n");
        }
    }
}

bool Verification(int digits, long number)
{
    // Invalid number of digits
    if (digits < 13 || digits > 16)
    {
        return false;
    }
    else
    {
        // Calculates the divisor that will be used to check the first digits
        long d = Divisor(digits - 2);

        // Valid AMEX
        if (digits == 15 && (number / d == 34 || number / d == 37))
        {
            type = "AMEX";
            return true;
        }

        // Valid Visa
        else if (number / (d * 10) == 4)
        {
            type = "VISA";
            return true;
        }

        else
        {
            // Valid MasterCard
            if (digits == 16)
            {
                for (short i = 51; i <= 55; i++)
                {
                    if (number / d == i)
                    {
                        type = "MASTERCARD";
                        return true;
                    }
                }
            }

            // Invalid card number
            return false;
        }
    }
}

bool Luhns_Algorithm(long number)
{
    int sum = 0;
    long d;

    // Luhn's Algorithm steps
    for (short i = 1; i < 16; i += 2)
    {
        // Starting with the number’s second-to-last digit
        d = Divisor(i);
        int x = 2 * (number % (10 * d) / d);

        // Starting from the end
        d = Divisor(i - 1);
        int y = (number % (10 * d) / d);

        // Seperate the digits
        if (x > 9)
        {
            x = (x / 10) + (x % 10);
        }

        // Do the sum
        sum += x + y;
    }

    // If the last digit of the sum is zero
    if (sum % 10 == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

long Divisor(short n)
{
    long divisor = 1;
    for (short i = 0; i < n; i++)
    {
        divisor *= 10;
    }
    return divisor;
}

