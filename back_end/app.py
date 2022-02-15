from flask import request, Response
import json

from user import User
from task_list import TaskList
from task import Task

from db_handler import app, db

def prepare_response(json_dict):
    resp = Response(json.dumps(json_dict))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    resp.headers['Access-Control-Allow-Methods'] = 'OPTIONS,POST,GET,DELETE'
    return resp

def get_tasks(task_list_id):
    tasks = Task.query.filter(Task.task_list_id == task_list_id)
    output = []
    for task in tasks:
        task_data = {'description': task.description, 'priority': task.priority, 'id': task.id}
        output.append(task_data)
    return output

def get_tasklists(user_id):
    task_lists = TaskList.query.filter(TaskList.user_id == user_id)
    output = []
    for task_list in task_lists:
        task_list_data = {'title': task_list.title, 'id': task_list.id}
        output.append(task_list_data)
    return output

@app.route('/')
def index():
    return 'Hello!'

@app.route('/users')
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {"login": user.login, "username": user.username, "pwd": user.pw_hash}
        output.append(user_data)
    return prepare_response({"users": output})

@app.route('/login')
def sign_in():
    email = request.args.get('email')
    pwd = request.args.get('pwd')
    user = User.query.filter_by(login=email, pw_hash=pwd).first_or_404(description='Senha ou e-mail inválido.')
    return get_user(user.id)

@app.route('/users/<id>')
def get_user(id):
    user = User.query.get_or_404(id)
    return prepare_response({ "id": user.id, "login": user.login, "username": user.username, "pwd": user.pw_hash, "task_lists": get_tasklists(id)})

@app.route('/tasklist/<user_id>/<id>')
def get_task_list(user_id, id):
    task_lists = get_tasklists(user_id)
    task_list = task_lists[id]
    return prepare_response({"id": task_list.id, "title": task_list.title, "tasks": get_tasks(task_list.id)})

@app.route('/addlist/<id>', methods=['POST'])
def add_task_list(id):
    user = User.query.get_or_404(id)
    task_list = TaskList(title=request.json['title'], user_id=user.id)
    db.session.add(task_list)
    db.session.commit()
    return prepare_response({'id': user.id})

@app.route('/users/<id>', methods=['POST'])
def set_pwd(id):
    user = User.query.get_or_404(id)
    user.pw_hash = request.args.get('pwd')
    db.session.commit()
    return prepare_response({ "login": user.login, "username": user.username, "pwd": user.pw_hash, "task_lists": get_tasklists(id)})

@app.route('/users', methods=['POST'])
def add_user():
    user = User(login=request.json['login'], username=request.json['username'], pw_hash=request.json['pwd'])
    db.session.add(user)    
    db.session.commit()
    return prepare_response({'id': user.id})

@app.route('/dellist/<id>', methods=['DELETE'])
def del_task_lists(id):
    User.query.get_or_404(id)
    task_lists = get_tasklists(id)
    ids_to_delete = request.json['ids']
    output = []
    for id in ids_to_delete:
        task_list = task_lists[id]
        tl_db = TaskList.query.get_or_404(task_list['id'])
        tl_db_data = {'title': tl_db.title, 'id': tl_db.id}
        output.append(tl_db_data)
        db.session.delete(tl_db)
    db.session.commit()
    return prepare_response({"message": f"Listas de tarefa removidas com sucesso.", 'task_lists': output})

@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return prepare_response({"message": f"user {id} was successfully deleted"})