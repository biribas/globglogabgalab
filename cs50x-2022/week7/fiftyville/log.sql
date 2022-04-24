-- Keep a log of any SQL queries you execute as you solve the mystery.

SELECT description FROM crime_scene_reports WHERE day = 28 AND month = 7 AND year = 2021 and street = 'Humphrey Street';
-- Finding out more about the crime

SELECT name, transcript FROM interviews WHERE transcript LIKE '%bakery%';
-- Reading witness interviews

SELECT license_plate, activity FROM bakery_security_logs WHERE day = 28 AND month = 7 AND year = 2021 AND hour = 10 AND minute >= 15 AND minute <= 25;
-- Trying to figure out the license plate of the thief's car. Eight cars left the parking lot within 10 minutes of the theft. One of them was the thief

SELECT account_number, amount FROM atm_transactions WHERE day = 28 AND month = 7 AND year = 2021  AND atm_location = 'Leggett Street' AND transaction_type = 'withdraw';
-- Trying to find the thief's account number. Eight people withdrew money from the ATM on the day of the crime

SELECT name, passport_number FROM people
    WHERE id IN
    (
        SELECT person_id FROM bank_accounts
            WHERE account_number IN
            (
                SELECT account_number FROM atm_transactions
                    WHERE day = 28
                    AND month = 7
                    AND year = 2021
                    AND atm_location = 'Leggett Street'
                    AND transaction_type = 'withdraw'
            )
    )
    AND license_plate IN
    (
        SELECT license_plate FROM bakery_security_logs
            WHERE day = 28
            AND month = 7
            AND year = 2021
            AND hour = 10
            AND minute >= 15
            AND minute <= 25
            AND activity = 'exit'
    );
-- Listing people who withdrew money and left the bakery within 10 minutes after the robbery. Number of suspects dropped to 4: Iman, Luca, Diana and Bruce.

SELECT caller, receiver FROM phone_calls WHERE day = 28 AND month = 7 AND year = 2021 AND duration < 60;
--Listing people who made a call that lasted less than 1 minute in the day of the theft

SELECT name, passport_number FROM people
    WHERE id IN
    (
        SELECT person_id FROM bank_accounts
            WHERE account_number IN
            (
                SELECT account_number FROM atm_transactions
                    WHERE day = 28
                    AND month = 7
                    AND year = 2021
                    AND atm_location = 'Leggett Street'
                    AND transaction_type = 'withdraw'
            )
    )
    AND license_plate IN
    (
        SELECT license_plate FROM bakery_security_logs
            WHERE day = 28
            AND month = 7
            AND year = 2021
            AND hour = 10
            AND minute >= 15
            AND minute <= 25
            AND activity = 'exit'
    )
    AND phone_number IN
    (
        SELECT caller FROM phone_calls
            WHERE day = 28
            AND month = 7
            AND year = 2021
            AND duration < 60
    );
-- Only two people withdrew money, left the bakery in less than 10 minutes after the theft and made a call that lasted less than 1 minute: Diana and Bruce

SELECT hour, minute FROM flights WHERE day = 29 AND month = 7 and year = 2021 AND origin_airport_id IN (SELECT id FROM airports WHERE city = 'Fiftyville');
-- The thief took the erliest flight. 8h20min

SELECT name FROM people
    WHERE passport_number IN
    (
        SELECT passport_number FROM passengers
            WHERE flight_id IN
            (
                SELECT id FROM flights
                    WHERE origin_airport_id IN
                    (
                        SELECT id FROM airports
                            WHERE city = 'Fiftyville'
                    )
                    AND day = 29
                    AND month = 7
                    AND year = 2021
                    AND hour = 8
                    AND minute = 20
            )
    )
    AND passport_number IN
    (
        SELECT passport_number FROM people
            WHERE id IN
            (
                SELECT person_id FROM bank_accounts
                    WHERE account_number IN
                    (
                        SELECT account_number FROM atm_transactions
                            WHERE day = 28
                            AND month = 7
                            AND year = 2021
                            AND atm_location = 'Leggett Street'
                            AND transaction_type = 'withdraw'
                    )
            )
            AND license_plate IN
            (
                SELECT license_plate FROM bakery_security_logs
                    WHERE day = 28
                    AND month = 7
                    AND year = 2021
                    AND hour = 10
                    AND minute >= 15
                    AND minute <= 25
                    AND activity = 'exit'
            )
            AND phone_number IN
            (
                SELECT caller FROM phone_calls
                    WHERE day = 28
                    AND month = 7
                    AND year = 2021
                    AND duration < 60
            )
    );
-- Bruce is the thief. But who is his accomplice?

SELECT name FROM people
    WHERE phone_number IN
    (
        SELECT receiver FROM phone_calls
            WHERE caller IN
            (
                SELECT phone_number FROM people
                    WHERE name = 'Bruce'
            )
            AND duration < 60
            AND day = 28
            AND month = 7
            AND year = 2021
    );
-- Robin was the receiver of Bruce's call. Therefore, he is bruce's accomplice.

SELECT city FROM airports
    WHERE id IN
    (
        SELECT destination_airport_id FROM flights
            WHERE origin_airport_id IN
            (
                SELECT id FROM airports
                    WHERE city = 'Fiftyville'
            )
            AND day = 29
            AND month = 7
            AND year = 2021
            AND hour = 8
            AND minute = 20
    );
-- Bruce fled to New York City