import Joi from 'joi'

export async function JoiValidator(data: any, method: (data: any) => Promise<any>, joiValidator: any) {
    const { error } = joiValidator.validate(data)

    if (error) {
        throw new Error(String(error.details.map((detail) => detail.message)))
    }

    return await method(data)
}

