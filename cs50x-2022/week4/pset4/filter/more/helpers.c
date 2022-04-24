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
            image[i][j].rgbtRed = average;
            image[i][j].rgbtGreen = average;
            image[i][j].rgbtBlue = average;
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

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    const short gx[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    const short gy[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};
    // Temporary array of type RGBTRIPLE
    RGBTRIPLE temp[height][width]; 
    // For each row
    for (int i = 0; i < height; i++)
    {
        // and each column
        for (int j = 0; j < width; j++)
        {
            int redGx = 0, redGy = 0;
            int greenGx = 0, greenGy = 0;
            int blueGx = 0, blueGy = 0;
            for (short r = -1; r <= 1; r++)
            {
                for (short c = -1; c <= 1; c++)
                {
                    if ((i + r) >= 0 && (i + r) < height && (j + c) >= 0 && (j + c) < width)
                    {
                        redGx += image[i + r][j + c].rgbtRed * gx[r + 1][c + 1];
                        redGy += image[i + r][j + c].rgbtRed * gy[r + 1][c + 1];
                        greenGx += image[i + r][j + c].rgbtGreen * gx[r + 1][c + 1];
                        greenGy += image[i + r][j + c].rgbtGreen * gy[r + 1][c + 1];
                        blueGx += image[i + r][j + c].rgbtBlue * gx[r + 1][c + 1];
                        blueGy += image[i + r][j + c].rgbtBlue * gy[r + 1][c + 1];
                    }
                }
            }
            short red = round(sqrt(pow(redGx, 2) + pow(redGy, 2)));
            short green = round(sqrt(pow(greenGx, 2) + pow(greenGy, 2)));
            short blue = round(sqrt(pow(blueGx, 2) + pow(blueGy, 2)));
            
            // check if the values exceed the limit of 255 
            red
            
            if (red > 255)
            {
                red = 255;
            }
            if (green > 255)
            {
                green = 255;
            }
            if (blue > 255)
            {
                blue = 255;
            }
            
            temp[i][j].rgbtRed = red;
            temp[i][j].rgbtGreen = green;
            temp[i][j].rgbtBlue = blue;
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
