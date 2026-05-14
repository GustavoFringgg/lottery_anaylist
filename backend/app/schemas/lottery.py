from pydantic import BaseModel
from datetime import datetime

# 每筆樂透的資料結構
class DrawResponse(BaseModel):
    game_code: int
    term: str
    draw_date: datetime
    numbers: list[int]
    special: int | None
    next_draw_date: datetime | None

# BingoBingo 的資料結構
class BingoResponse(BaseModel):
    game_code: int
    term: str
    draw_date: datetime
    numbers: list[int]
    next_draw_date: datetime | None
    special: int
    lot_big_small: str
    lot_odd_even: str



# 單一樂透的歷史資料資料結構
class DrawHistoryItem(BaseModel):
    game_code: int
    term: str
    draw_date: datetime
    numbers: list[int]
    special: int | None

# BingoBingo 的歷史資料資料結構
class BingoDrawHistoryItem(DrawHistoryItem):
    lot_big_small: str
    lot_odd_even: str

# 回給前端單一種類彩券歷史資料的資料結構
class DrawListResponse(BaseModel):
    slug: str
    name: str
    draw_list: list[DrawHistoryItem | BingoDrawHistoryItem]

class DrawStatsItem(DrawHistoryItem):
    odd_even_ratio: str   # 單雙比例
    total_sum: int        # 和值
    average: float        # 均值 
    same_tail: str        # 同尾數
    head_tail_diff: int   # 首尾差
    tail_sum: int         # 尾數和
    head_sum: int         # 首數和

class DrawStatsResponse(BaseModel):
    slug: str
    name: str
    draw_list: list[DrawStatsItem]

class GameHotNumbers(BaseModel):
    name: str
    hot_numbers: list[int]
    hot_special: list[int] | None = None 
class HotNumbersResponse(BaseModel):
    data:dict[str,GameHotNumbers]