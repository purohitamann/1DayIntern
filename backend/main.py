import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # For handling CORS
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env.local (if you name it differently, change here)
load_dotenv("../.env.local")

# Get Supabase credentials
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# Configure CORS so your frontend can communicate with this API
# Adjust allow_origins for production (e.g. your domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] if that's your Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI with Supabase"}


@app.get("/data/{table_name}")
async def get_data(table_name: str):
    """
    Fetches all rows from a given table.
    """
    try:
        response = supabase.table(table_name).select("*").execute()
        # Check if there's an error in the response
        if hasattr(response, 'error') and response.error:
            raise HTTPException(status_code=400, detail=response.error.message)

        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/data/{table_name}")
async def insert_data(table_name: str, payload: dict):
    """
    Inserts a new row into a given table.
    The request body should be a JSON object matching your table schema.
    """
    try:
        response = supabase.table(table_name).insert(payload).execute()

        # Check for errors
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to insert data.")

        if "error" in response.data:
            raise HTTPException(status_code=400, detail=response.data["error"]["message"])

        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e) + " -- Insert Data Error")

@app.get("/roles")
async def get_roles():
    """
    Fetch all roles, including their nested tasks, in a single request.
    """
    try:
        # If your 'tasks' table has a foreign key to 'roles' 
        # (i.e., tasks.role_id → roles.id),
        # you can use PostgREST embedding with 'select("*, tasks(*)")'.

        response = supabase.table("roles").select("*, tasks(*)").execute()

        # if response.status_code != 200:
        #     raise HTTPException(
        #         status_code=400,
        #         detail=f"Failed to fetch roles: {response.error}"
        #     )

        return {"data": response.data}

    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error retrieving roles: {str(e)}"
        )
# Run the app if called directly (e.g. `python main.py`)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
