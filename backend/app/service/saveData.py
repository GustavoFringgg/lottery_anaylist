from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert as pg_insert
from app.models.lottery import DrawsList, BingoExtra

#TODO:TEST 測重複資料是否正確跳過（不重複寫入），以及 BingoExtra 只在 game_code==1102 時建立
#TODO:L
async def save_draws(session: AsyncSession, draws: list[dict]):
    for draw in draws:
        stmt = (
            pg_insert(DrawsList)
            .values(
                game_code=draw["game_code"],
                term=draw["term"],
                draw_date=draw["draw_date"],
                numbers=draw["numbers"],
                next_draw_date=draw["next_draw_date"],
            )
            .on_conflict_do_nothing(constraint="uq_drawslist_game_term")
            .returning(DrawsList.id)
        )
        result = await session.execute(stmt)
        row_id = result.scalar_one_or_none()

        if row_id is not None and draw["game_code"] == 1102:
            extra = BingoExtra(
                draw_id=row_id,
                lot_special=draw["lot_special"],
                lot_big_small=draw["lot_big_small"],
                lot_odd_even=draw["lot_odd_even"],
            )
            session.add(extra)

    await session.commit()
