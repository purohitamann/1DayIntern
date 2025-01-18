from libs.utils import supabase
from fastapi import FastAPI, HTTPException
import uvicorn
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI with Supabase"}
#Table1
@app.get("/data/{users}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/data/{users}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Table2    
@app.get("/data/{roles}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
@app.post("/data/{roles}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Table3
@app.get("/data/{userrewards}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
@app.post("/data/{userrewards}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Table4
@app.get("/data/{rewards}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
@app.post("/data/{rewards}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))                
#Table5
@app.get("/data/{tasks}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
@app.post("/data/{tasks}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
#Table6
@app.get("/data/{progress}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
@app.post("/data/{progress}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
#Table7
@app.get("/data/{companies}")
async def get_data(table_name: str):
    try:
        
        response = supabase.table(table_name).select("*").execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
@app.post("/data/{companies}")
async def insert_data(table_name: str, payload: dict):
    try:
        
        response = supabase.table(table_name).insert(payload).execute()
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        return {"message": "Data inserted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)