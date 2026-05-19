from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

#TODO:L
engine = create_async_engine(settings.async_database_url, echo=False, pool_pre_ping=True)
AsyncSessionLocal = sessionmaker(
    engine,class_=AsyncSession,expire_on_commit = False
)


async def get_session():
    async with AsyncSessionLocal() as session:
        yield session