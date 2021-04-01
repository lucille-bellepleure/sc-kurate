import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import main from "styles.module.css";
import styles from "./simple-status.module.css";

export function SimpleChecklist({ title, titleDone, titleError, successStage, errorClick, status }) {
    const history = useHistory();
    const [dialogTitle, setDialogTitle] = useState(title || "not found")
    const [dialogDoneTitle, setDialogDoneTitle] = useState(titleDone || "not found")
    const [dialogErrorTitle, setDialogErrorTitle] = useState(titleError || "not found")
    const [statusState, setStatusState] = useState(1)

    useEffect(() => {
        setStatusState(status)
    }, [status])

    const dispatch = useDispatch();

    const StatusButton = () => {
        if (statusState == 1) {
            return (
                <div className={styles.containergreen}>
                    <div className={styles.title}>{dialogTitle}</div>
                    <div className={styles.statusbox}>
                        <div className={styles.bar}>
                            <div className={styles.loading}>
                                <div className={[styles.smallpoint, styles.point1].join(" ")} />
                                <div className={[styles.smallpoint, styles.point2].join(" ")} />
                                <div className={[styles.smallpoint, styles.point3].join(" ")} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (statusState == 2) {
            return (
                <div className={styles.containergreen}>
                    <div className={styles.title}>{dialogDoneTitle}</div>
                    <div
                        tabIndex="2"
                        className={[
                            main.iconbuttonbig,
                            styles.confirmCheck,
                            styles.confirm
                        ].join(" ")}
                        onClick={successStage}
                    >
                        <div className={main.nextgrayicon} />
                    </div>
                </div>
            )

        } else if (statusState == 3) {
            return (
                <div className={styles.containerred}>
                    <div className={styles.title}>{dialogErrorTitle}</div>
                    <div
                        tabIndex="2"
                        className={[
                            main.iconbuttonbig,
                            styles.confirmCheck,
                            styles.confirm
                        ].join(" ")}
                        onClick={errorClick}
                    >
                        <div className={main.xmarkicon} />
                    </div>
                </div>
            )
        }
    }

    return (
        <StatusButton></StatusButton>
    )
}

export default SimpleChecklist;
