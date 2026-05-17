from app.api.routers.lottery import get_special

numbers = [1,2,3,4,5,6]
def test_get_special():
    result = get_special(5118,numbers)
    assert result == 6

def tast_get_not_special():
    result = get_special(5120, numbers)
    assert result is None
