const normalizeRecipe = async (rawRecipe, userId) => {
    const normalizedRecipe = {
        ...rawRecipe,
        tags: rawRecipe.tags || [],
        createdBy: userId,
        sections: []
    }

    if (Array.isArray(rawRecipe.sections)) {
        normalizedRecipe.sections = rawRecipe.sections.map((section, index) => {
            const { type, content } = section

            if (!type || !content) {
                throw new Error(`Section at index ${index} is missing type or content`)
            }

            if (type === 'text' || type === 'title') {
                return {
                    type,
                    content: typeof content === 'string' ? content : String(content),
                    position: index
                }
            }

            if (type === 'image') {
                if (typeof content === 'string') {
                    return {
                        type,
                        content: {
                            url: content,
                            alt: ''
                        },
                        position: index
                    }
                }

                if (typeof content === 'object') {
                    return {
                        type,
                        content: {
                            url: content.url || '',
                            alt: content.alt || ''
                        },
                        position: index
                    }
                }

                throw new Error(`Invalid content format in image section at index ${index}`)
            }

            return section
        })
    }

    return normalizedRecipe
}

module.exports = { normalizeRecipe }
