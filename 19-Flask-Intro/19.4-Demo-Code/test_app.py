from app import app
from unittest import TestCase

class ColorViewstTestCase(TestCase):
    def test_color_form(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)