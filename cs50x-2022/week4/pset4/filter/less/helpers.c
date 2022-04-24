#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            BYTE average = round((image[i][j].rgbtBlue + image[i][j].rgbtRed + image[i][j].rgbtGreen) / 3.0);
            image[i][j].rgbtBlue = average;
            image[i][j].rgbtRed = average;
            image[i][j].rgbtGreen = average;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    // For each row
    for (int i = 0; i < height; i++)
    {
        // and each column
        for (int j = 0; j < width; j++)
        {
            short sepiaRed = round(.393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue);
            short sepiaGreen = round(.349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue);
            short sepiaBlue = round(.272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue);
            if (sepiaRed > 255)
            {
                sepiaRed = 255;
            }
            if (sepiaGreen > 255)
            {
                sepiaGreen = 255;
            }
            if (sepiaBlue > 255)
            {
                sepiaBlue = 255;
            }
            image[i][j].rgbtBlue = sepiaBlue;
            image[i][j].rgbtRed = sepiaRed;
            image[i][j].rgbtGreen = sepiaGreen;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    // For each row
    for (int i = 0; i < height; i++)
    {
        for (int low = 0, high = width - 1; low < high; low++, high--)
        {
            RGBTRIPLE temp = image[i][low];
            image[i][low] = image[i][high];
            image[i][high] = temp;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Temporary array of type RGBTRIPLE
    RGBTRIPLE temp[height][width]; 
    // For each row
    for (int i = 0; i < height; i++)
    {
        // and each column
        for (int j = 0; j < width; j++)
        {
            float divisor = 0;
            int red = 0;
            int green = 0;
            int blue = 0;
            for (short r = -1; r <= 1; r++)
            {
                for (short c = -1; c <= 1; c++)
                {
                    if ((i + r) >= 0 && (i + r) < height && (j + c) >= 0 && (j + c) < width)
                    {
                        red += image[i + r][j + c].rgbtRed;
                        green += image[i + r][j + c].rgbtGreen;
                        blue += image[i + r][j + c].rgbtBlue;
                        divisor++;
                    }
                }
            }
            temp[i][j].rgbtRed = round(red / divisor);
            temp[i][j].rgbtGreen = round(green / divisor);
            temp[i][j].rgbtBlue = round(blue / divisor);
        }
    }
    
    // equals image to temp array 
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j].rgbtRed = temp[i][j].rgbtRed;
            image[i][j].rgbtGreen = temp[i][j].rgbtGreen;
            image[i][j].rgbtBlue = temp[i][j].rgbtBlue;
        }
    }
    return;
}