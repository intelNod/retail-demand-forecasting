"""One valid feature object shared by inference and API tests."""

VALID_INPUT = {
    "sales_lag_1": 12,
    "sales_lag_2": 10,
    "sales_lag_4": 8,
    "sales_lag_8": 9,
    "sales_roll_mean_4": 10.5,
    "sales_roll_std_4": 1.8,
    "sales_roll_mean_8": 9.7,
    "sales_roll_std_8": 2.1,
    "zero_weeks_last_4": 0,
    "sell_price_mean": 2.49,
    "price_lag_1": 2.49,
    "price_change_pct": 0,
    "year": 2016,
    "month": 5,
    "week_of_year": 20,
    "quarter": 2,
    "event_days": 0,
    "has_event": 0,
    "snap_days": 3,
    "has_snap": 1,
}
