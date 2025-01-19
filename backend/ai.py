from groq import Groq
import datetime
import time

# Initialize Groq client
client = Groq()

# User progress tracker (In production, use a database)
user_data = {}

def chatbot_reply(user_id, user_message):
    """
    Generate a reply using Groq's language model.
    """
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message},
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.5,
        max_completion_tokens=512,
        top_p=1,
        stop=None,
        stream=False,
    )
    reply = response.choices[0].message.content
    return reply

def track_progress(user_id, task):
    """
    Track user progress and schedule reminders.
    """
    if user_id not in user_data:
        user_data[user_id] = {"tasks": [], "reminders": []}
    
    # Add the task to the user's data
    user_data[user_id]["tasks"].append({"task": task, "timestamp": datetime.datetime.now()})

    # Schedule a reminder in 24 hours (adjust timing as needed)
    reminder_time = datetime.datetime.now() + datetime.timedelta(hours=24)
    user_data[user_id]["reminders"].append({"task": task, "reminder_time": reminder_time})
    print(f"Reminder scheduled for {user_id}: {task} at {reminder_time}")

def check_reminders():
    """
    Periodically check for reminders and notify users.
    """
    while True:
        current_time = datetime.datetime.now()
        for user_id, data in user_data.items():
            for reminder in data["reminders"]:
                if current_time >= reminder["reminder_time"]:
                    print(f"Reminder for {user_id}: {reminder['task']}")
                    data["reminders"].remove(reminder)
        time.sleep(60)  # Check every minute

# Example: Interactive chatbot
if __name__ == "__main__":
    user_id = "user123"  # Unique identifier for the user
    print("Chatbot initialized. Type 'exit' to quit.")

    while True:
        user_message = input("You: ")
        if user_message.lower() == "exit":
            print("Goodbye!")
            break
        
        # Chatbot generates a response
        reply = chatbot_reply(user_id, user_message)
        print(f"Chatbot: {reply}")

        # Example: Tracking a task
        if "track" in user_message.lower():
            task = user_message.replace("track", "").strip()
            track_progress(user_id, task)
            print("Task tracked successfully.")

    # Start checking reminders in the background
    check_reminders()
