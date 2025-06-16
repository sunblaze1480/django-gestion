import psycopg
import os

# Load environment variables from .env


# Connect to the database
try:
    connection = psycopg.connect(
        user="postgres",
        password="V3ntan1t42024$",
        host="dbt.eagihmnglzgwjbkjllvu.supabase.co",
        port="5432",
        dbname="postgres"
    )
    print("Connection successful!")
    
    # Create a cursor to execute SQL queries
    cursor = connection.cursor()
    
    # Example query
    cursor.execute("SELECT NOW();")
    result = cursor.fetchone()
    print("Current Time:", result)

    # Close the cursor and connection
    cursor.close()
    connection.close()
    print("Connection closed.")

except Exception as e:
    print(f"Failed to connect: {e}")