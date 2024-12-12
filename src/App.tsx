import { FC, SyntheticEvent, useEffect, useState } from "react";
import styles from './App.module.css';

interface Param {
    id: number;
    name: string;
    type: 'string' | 'number' | 'list';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

const App = () => {
    const [params, setParams] = useState<Param[]>([]);
    const [paramValues, setParamsValues] = useState<ParamValue[]>([]);

    const onUpdateParamValues = (newParamValue: ParamValue) => {
        const newParamValues = [...paramValues];
        newParamValues[newParamValue.paramId] = newParamValue;
        setParamsValues(newParamValues);
    };

    const getModel = (): Model => {
        return {
            paramValues,
        };
    };

    const onSubmit = (param: Param) => {
        const newParam: Param = {
            id: params[params.length - 1] ? params[params.length - 1].id + 1 : 0,
            name: param.name,
            type: param.type,
        };

        const newParamValue: ParamValue = {
            paramId: newParam.id,
            value: "Empty",
        };

        setParams([...params, newParam]);
        setParamsValues([...paramValues, newParamValue]);
    };

    const save = () => {
        const model = getModel();
        console.log(model);
    };

    return (
            <div className={styles.mainContainer}>
                {params.length > 0 &&
                    params.map((param, index) => (
                        <ParamInputs
                            param={param}
                            paramValue={paramValues[index]}
                            key={index}
                            onUpdateParamValues={onUpdateParamValues}
                        />
                    ))}
                <ParamForm onUpdate={onSubmit} />
                <button className={styles.saveButton} onClick={save}>
                    Save
                </button>
            </div>
    );
};

interface ParamFormProps {
    onUpdate: (param: Param) => void;
}

const ParamForm: FC<ParamFormProps> = ({ onUpdate }) => {
    const [name, setName] = useState("Empty");
    const [variant, setVariant] = useState<"string" | "list" | "number">("string");

    const [param, setParam] = useState<Param>({
        name,
        id: 0,
        type: variant,
    });

    useEffect(() => {
        setParam((prev) => ({
            ...prev,
            name,
            type: variant,
        }));
    }, [name, variant]);

    const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(param);
    };

    const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.formLabel}>Type name of new param</label>
            <input
                className={styles.formInput}
                onChange={onChange}
                value={name}
            />
            <select
                className={styles.formSelect}
                onChange={(e) => setVariant(e.currentTarget.value as "string" | "number" | "list")}
            >
                <option defaultChecked={true} value="string">
                    String
                </option>
                <option disabled={true} value="number">
                    Int
                </option>
                <option disabled={true} value="list">
                    List
                </option>
            </select>
            <button className={styles.formButton}>Create</button>
        </form>
    );
};

interface ParamInputsProps {
    param: Param;
    paramValue: ParamValue;
    onUpdateParamValues: (newParam: ParamValue) => void;
}

const ParamInputs: FC<ParamInputsProps> = ({ param, paramValue, onUpdateParamValues }) => {
    const [inputBody, setInputBody] = useState<string>(paramValue.value);

    const onUpdate = (e: SyntheticEvent<HTMLInputElement>) => {
        const newParamValue = { ...paramValue, value: e.currentTarget.value };
        onUpdateParamValues(newParamValue);
        setInputBody(e.currentTarget.value);
    };

    return (
        <div className={styles.paramContainer}>
            <label className={styles.paramLabel} key={param.id}>
                {param.name}
            </label>
            <input
                className={styles.paramInput}
                value={inputBody}
                onChange={onUpdate}
            />
        </div>
    );
};

export default App;
