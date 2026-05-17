# Backend

FastAPI + PostgreSQL，部署於 Render。

## 安裝依賴

```bash
# 進入虛擬環境
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux

# 正式環境套件
pip install -r requirements.txt

# 開發 / 測試用套件（本機開發才需要）
pip install -r requirements-dev.txt
```

## 啟動開發伺服器

```bash
# Windows
python main.py

# Mac / Linux
python3 main.py
```

## 執行測試

```bash
pytest tests/
```
