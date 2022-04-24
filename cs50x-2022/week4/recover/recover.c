#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
 
int main(int argc, char *argv[])
{
    typedef uint8_t BYTE;
    
    if (argc != 2)
    {
        fprintf(stderr, "Usage: recover filmename\n");
        return 1;
    }
    
    FILE *card = fopen(argv[1], "r");
    if (card == NULL)
    {
        fprintf(stderr, "Couldn't open the file\n");
        return 1;
    }
    
    BYTE buffer[512];
    int flag = 0;
    char filename[8];
    FILE *img;
    
    // until the end of file
    while (!(fread(buffer, sizeof(BYTE), 512, card) < 512))
    {
        // if the file is a jpeg
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            if (flag != 0)
            {
                fclose(img);
            }
            
            sprintf(filename, "%03i.jpg", flag); 
            img = fopen(filename, "w");
            flag++;
        }
        
        if (flag != 0)
        {
            fwrite(buffer, sizeof(BYTE), 512, img);
        }
    }
    
    // close the files
    fclose(card);
    fclose(image);
}