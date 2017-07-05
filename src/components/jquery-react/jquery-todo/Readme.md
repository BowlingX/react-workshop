A simple jQuery TODO Application using `handlebars` to manage our view.

    <JQueryTodo onSave={(model) => alert(model.map(todo => todo.name))}/>