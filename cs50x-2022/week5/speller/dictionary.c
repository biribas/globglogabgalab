// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include <strings.h>
#include <stdio.h>
#include <stdlib.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Choose number of buckets in hash table
const unsigned int N = 512;

// Hash table
node *table[N];

// dictionary size
unsigned int dsize;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    unsigned int index = hash(word);

    for (node *n = table[index]; n != NULL; n = n->next)
    {
        if (strcasecmp(n->word, word) == 0)
        {
            return true;
        }
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    unsigned int sum = 0;
    for (unsigned short i = 0; word[i] != '\0'; i++)
    {
        sum += isalpha(word[i]) ? tolower(word[i]) : 0;
    }
    return sum % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        return false;
    }

    for (unsigned int i = 0; i < N; i++)
    {
        table[i] = NULL;
    }

    char word[LENGTH + 1];

    while (fscanf(file, "%s", word) != EOF)
    {
        unsigned int index = hash(word);
        node *n = malloc(sizeof(node));
        if (n == NULL)
        {
            unload();
            fclose(file);
            return false;
        }
        strcpy(n->word, word);
        n->next = table[index];
        table[index] = n;

        dsize++;
    }
    fclose(file);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    return dsize;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    for (unsigned int i = 0; i < N; i++)
    {
        node *n = table[i];
        while (n != NULL)
        {
            node *buffer = n->next;
            free(n);
            n = buffer;
        }
    }
    return true;
}
