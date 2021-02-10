import { UserInputError } from 'apollo-server-micro';

export default function fieldsCannotBeEmpty(fields) {
    Object.keys(fields).forEach(name => {
        if (!fields[name]) {
            throw new UserInputError(`${name} cannot be left empty.`, {
                invalidArgs: [name],
            });
        }
    });
}
