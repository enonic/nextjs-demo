import React from "react"
import {MetaData, PartData} from "../guillotine/getMetaData";
import {ComponentRegistry} from '../ComponentRegistry';
import {IS_DEV_MODE, RENDER_MODE} from '../utils';
import DataDump from "./DataDump";
import Empty from './Empty';


export interface PartProps {
    part: PartData;
    data?: any;
    common?: any; // Content is passed down to componentviews. TODO: Use a react contextprovider instead?
    meta: MetaData;
}

interface BasePartProps {
    component?: PartData;
    common?: any;
    data?: any;
    error?: string;
    meta: MetaData;
}

const BasePart = (props: BasePartProps) => {
    const {component, data, common, error, meta} = props;

    if (error) {
        console.warn(`BasePart: '${component?.descriptor}' error: ${error}`);
        return meta.renderMode === RENDER_MODE.EDIT ?
               <ErrorPart reason={error} descriptor={component?.descriptor}/> :
               <Empty/>;
    }

    let partSelection;
    if (component) {
        partSelection = ComponentRegistry.getPart(component.descriptor);
    }
    const SelectedPartView = partSelection?.view;
    if (SelectedPartView) {
        return <SelectedPartView part={component}
                                 data={data}
                                 common={common}
                                 meta={meta}/>;
    } else if (component?.descriptor) {
        // empty descriptor usually means uninitialized part
        console.warn(`BasePart: can not render part '${component.descriptor}': no next view or catch-all defined`);
    }
    return null;
}

export default BasePart;

export const ErrorPart = ({descriptor, reason}: { descriptor?: string, reason: string }) => {
    return (
        <div style={{
            border: "2px solid red",
            padding: '16px',
        }}>
            <h3 style={{margin: 0}}>Part error: {descriptor}</h3>
            <pre style={{marginBottom: 0}}>{reason ? reason : 'Unknown error'}</pre>
        </div>
    )
}



const PartView = ({part, data}: PartProps) => (
    <div className={`part`}
         style={{marginTop: "2rem", padding: "10px", border: "2px solid lightgrey"}}>
        <h6 style={{fontSize: ".7em", fontWeight:"normal", color:"#bbb", marginTop: "0", marginBottom: "0"}}>Part debug:</h6>
        <h3 style={{marginTop: "0", marginBottom: "8px"}}>{part.descriptor}</h3>
        <DataDump label="config" data={part.config} />
        <DataDump label="data" data={data} />
    </div>
);

export const PartDevView = IS_DEV_MODE
    ? PartView
    : Empty;

