type TodoItemOptions = {
    deadline?: Date,
    completed?: boolean
}
type Nullable<T> = T | null;

const MustBeWord = /\w+/;
const Regex = {
    title: MustBeWord,
    description: MustBeWord
}

function throwErr(type: string, value: string, regex: RegExp) {
    throw Error(`${type}, ${value}: Must match ${regex}`);
}

export default class TodoItem {
    constructor(title: string, description?: string, options?: TodoItemOptions) {
        this._title = "My todo";
        this._description = ""
        
        this.title = title;
        if (description) this.description = description;

        this.completed = options?.completed ?? false;
        this.deadline = options?.deadline ?? null;
    }

    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        if (!value.match(Regex.title)) throwErr("Invalid input", value, Regex.title)
        this._title = value;
    }

    private _description: string;
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        if (!value.match(Regex.description)) throwErr("Invalid input", value, Regex.description)
        this._description = value;
    }
    
    public completed: boolean;
    public deadline: Nullable<Date>;
}