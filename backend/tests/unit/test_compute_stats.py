from app.api.routers.lottery import compute_stats

numbers = [11, 21, 31, 42, 43]
result = compute_stats(numbers)

def test_odd_even_ratio():
    assert result["odd_even_ratio"] == "4:1"

def test_total_sum():
    assert result["total_sum"] == 148

def test_average():
    assert result["average"] == 29.6

def test_head_tail_diff():
    assert result["head_tail_diff"] == 32

def test_tail_sum():
    assert result["tail_sum"] == 8

def test_head_sum():
    assert result["head_sum"] == 14

def test_same_tail_none():
    result = compute_stats([1, 2, 3, 4, 5])  
    assert result["same_tail"] == "-"

def test_same_tail_exists():
    result = compute_stats([11, 21, 3, 4, 5])  
    assert result["same_tail"] == '1尾(2)'