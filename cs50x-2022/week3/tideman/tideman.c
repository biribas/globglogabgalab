#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer i over j
int preferences[MAX][MAX];

// locked[i][j] means i is locked in over j
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
}
pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2];

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
bool check_cycle(int start, int loser);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference
        int ranks[candidate_count];

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }

        record_preferences(ranks);

        printf("\n");
    }

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
    return 0;
}

// Update ranks given a new vote
bool vote(int rank, string name, int ranks[])
{
    for (short i = 0; i < candidate_count; i++)
    {
        if (strcmp(name, candidates[i]) == 0)
        {
            ranks[rank] = i;
            return true;
        }
    }
    return false;
}

// Update preferences given one voter's ranks
void record_preferences(int ranks[])
{
    for (short i = 0; i < candidate_count; i++)
    {
        for (short j = i + 1; j < candidate_count; j++)
        {
            preferences[ranks[i]][ranks[j]]++;
        }
    }
    return;
}

// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    for (short i = 0; i < candidate_count; i++)
    {
        for (short j = i + 1; j < candidate_count; j++)
        {
            if (preferences[i][j] > preferences[j][i])
            {
                pairs[pair_count].winner = i;
                pairs[pair_count].loser = j;
                pair_count++;
            }
            else if (preferences[i][j] < preferences[j][i])
            {
                pairs[pair_count].winner = j;
                pairs[pair_count].loser = i;
                pair_count++;
            }
        }
    }
    return;
}

// Sort pairs in decreasing order by strength of victory
void sort_pairs(void)
{
    pair helper;
    bool sorted;

    // Bubble sort (decreasing order)
    for (short i = 1; i < pair_count; i++)
    {
        sorted = true;
        for (short j = 0; j < pair_count - i; j++)
        {
            int winner1 = pairs[j].winner;
            int loser1 = pairs[j].loser;
            int winner2 = pairs[j + 1].winner;
            int loser2 = pairs[j + 1].loser;

            if (preferences[winner1][loser1] < preferences[winner2][loser2])
            {
                helper = pairs[j];
                pairs[j] = pairs[j + 1];
                pairs[j + 1] = helper;

                sorted = false;
            }
        }

        if (sorted)
        {
            break;
        }
    }
    return;
}

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{
    // Lock pairs
    for (short i = 0; i < pair_count; i++)
    {
        if (!check_cycle(pairs[i].winner, pairs[i].loser))
        {
            locked[pairs[i].winner][pairs[i].loser] = true;
        }
    }
    return;
}

// Check if there is a cycle in the graph
bool check_cycle(int start, int loser)
{
    // If this edge comes from the starting point
    if (start == loser)
    {
        // the edge would form a cycle
        return true;
    }

    for (short i = 0; i < candidate_count; i++)
    {
        // Does the current start get an edge?
        if (locked[i][start])
        {
            // Check if this new edge would form a cycle
            if (check_cycle(i, loser))
            {
                return true;
            }
        }
    }

    // the edge would not form a cycle
    return false;
}

// Print the winner of the election
void print_winner(void)
{
    // Check if the candidate i is the source
    for (short i = 0; i < candidate_count; i++)
    {
        bool was_locked = false;

        for (short j = 0; j < candidate_count; j++)
        {
            // If the candidate j have been locked the candidate i
            if (locked[j][i])
            {
                // Candidate i is not the source
                was_locked = true;
                // Stops the inner loop
                break;
            }
        }

        // If the candidate has not been locked
        if (!was_locked)
        {
            // The source was found
            printf("%s\n", candidates[i]);
            break;
        }
    }
    return;
}

