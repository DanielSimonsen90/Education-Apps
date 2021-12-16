import { css } from "../config";

export type Nullable<T> = T | null;

type DateString<Sep extends string = '/'> = `${number}${Sep}${number}${Sep}${number}`;
type DateTimeString = `${DateString<"-">}T${DateString<":">}`
type TodoItemOptions = {
    deadline?: Nullable<Date> | DateString | DateTimeString,
    completed?: boolean
    doing?: boolean
}

const MustBeWord = /\w+/;
const Regex = {
    title: MustBeWord,
    description: MustBeWord
}

function throwErr(type: string, value: string, regex: RegExp) {
    throw Error(`${type}, ${value}: Must match ${regex}`);
}
export type DeadlineValues = 'Completed' | 'Future' | 'In Progress' | 'Missed' | 'No Deadline' | 'Error';
export default class TodoItem {
    public static GetCompletion({ deadline, completed, doing }: TodoItem): DeadlineValues {
        const now = new Date();

        if (doing) return 'In Progress';
        else if (completed) return 'Completed';
        else if (!deadline) return 'No Deadline';
        else if (now.getTime() < deadline.getTime() && !completed) return 'Future';
        else if (now.getTime() > deadline.getTime() && !completed) return 'Missed';
        return 'Error';
    }
    public static JsonParse(o: any) {
        return new TodoItem(o['_title'], o['_description'], {
            completed: o['completed'],
            doing: o['doing'],
            deadline: o['deadline'] && new Date(o['deadline'])
        })
    }
    public static GetCompletetionColor(item: TodoItem) {
        const result = this.GetCompletion(item);

        switch (result) {
            case 'Future': return css.color.tertiary;
            case 'In Progress': return css.color.doing;
            case 'Missed': return css.color.cancelDisabled;
            case 'Completed': return css.color.confirmDisabled;
            default: return css.color.dampen;
        }
    }

    constructor(title: string, description?: string, options?: TodoItemOptions) {
        this._title = "My todo";
        this._description = ""
        
        this.title = title;
        if (description) this.description = description;

        this.completed = options?.completed ?? false;
        this.doing = options?.doing ?? false;
        this.deadline = options?.deadline && new Date(options.deadline) || null;
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
    public doing: boolean;
    public deadline: Nullable<Date>;
}