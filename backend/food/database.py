import tinydb


class Database:
    def __init__(self):
        self._db = None  # type: tinydb.TinyDB

    def init_app(self, db_path):
        self._db = tinydb.TinyDB(db_path)

    def get_products(self):
        product_tbl: tinydb.Table = self._db.table("product")
        return [{"uuid": r["uuid"], "name": r["name"]} for r in product_tbl]
