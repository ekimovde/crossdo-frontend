BaseInput:
props:

as?: string; - inputWrap html tag

wrapClasses?: string[]; inputWrap css styles

value: string; input value

title: string; text for label

required?: boolean; isRequred icon for label

clearable?: boolean; - clear buttom showing

clearCallback?: () => void; - callback func for clear button

error?: boolean; error state

errorMessage?: string; error message from parrent

success?: boolean; success state

successMessage?: string; success message from parrent

inputDisabled?: boolean; isDisabled state

variant?: string; variant for input like ['card-number', 'phone', 'password', 'text'] default: 'text'

variant defines states for:

inputType {

inputMode: inputModeType; - inputmode for input

validation: string; component-side validation

type: string - type for input

}

example:

BaseInput

// props:

as="button" - button tag for Inputwrap

:value="value" - value

inputDisabled - disalbed state

:clearable="clearable" -isShow clear button

:clearCallback="onClear" callback from parrent for clear button

:title="label" - label

///
@focus="$emit('focus', $event)"

:class="[
styles.wrapper,
styles.disabled,
{
[styles.focused]: focused || value,
[styles.filled]: value,
},
]"
/>
