import tinydb
import typing


class Database:
    def __init__(self):
        self._db = None  # type: tinydb.TinyDB

    def init_app(self, db_path):
        self._db = tinydb.TinyDB(db_path)

    def get_products(self) -> typing.Iterable:
        product_tbl: tinydb.Table = self._db.table("product")
        products = (p for p in product_tbl)
        return products
