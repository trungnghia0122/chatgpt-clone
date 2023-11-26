'use client'

import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/getModels').then(res => res.json());

function ModelSelection() {
    const { data: models, isLoading } = useSWR('models', fetchModels);

    const {data: model, mutate: setModel } = useSWR('model', {fallbackData: 'text-davinci-003'})

    return (
        <div>
            <Select
            className='text-sm font-bold'
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isSearchable
                isLoading={isLoading}
                menuPosition='fixed'
                classNames={{
                    control: (state) => ''
                }}
                onChange={(e) => setModel(e.value)}
            />
        </div>
    )
}

export default ModelSelection