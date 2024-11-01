import pytest
from app import app as flask_app

@pytest.fixture
def app():
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_health(client):
    response = client.get('/health')
    assert response.status_code == 200
    assert response.get_json() == {'status': 'healthy'}

def test_create_item(client):
    response = client.post('/items', json={'name': 'Test Item'})
    assert response.status_code == 201
    assert response.get_json() == {'name': 'Test Item'}