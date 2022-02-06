/**
 *
 */
export const validationTests = {

    /**
     *
     * @param field
     */
    required: (field: HTMLElement): boolean => {




        return false
    },
    /**
     *
     * @param field
     */
    email: (field: HTMLInputElement): boolean => {
        if (field.value === "") {
            return false
        }
        return !!field.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    telephone: (field: HTMLInputElement): boolean => {

        return true
    },
}