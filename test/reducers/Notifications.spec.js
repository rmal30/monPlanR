import Notifications from "../../app/reducers/Notifications";
import { describe, it } from "mocha";

describe("REDUCER: Notifications", () => {
    describe("ACTION: ADD_NOTIFICATION", () => {
        it("should insert a notification from an empty list", () => {
            const stateBefore = {
                notificationsList: []
            };

            const action = {
                type: "ADD_NOTIFICATION",
                id: "TEST_NOTIFICATION",
                title: "This is a test",
                message: "Some message goes over here",
                level: "info"
            };

            const stateAfter = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    }
                ]
            };

            test(Notifications, stateBefore, action, stateAfter);
        });

        it("should prepend a notification into an list of a few existing notifications.", () => {
            const stateBefore = {
                notificationsList: [
                    {
                        id: "GENERIC_ERROR",
                        title: "Error",
                        message: "Something went wrong. Please try again later.",
                        level: "error",
                        dismissable: true,
                        autoDismiss: undefined
                    },
                    {
                        id: "CONNECTION_LOST",
                        title: "Lost connection",
                        message: "Please check your connection. This notification will go away once you go online.",
                        level: "warning",
                        dismissable: false,
                        autoDismiss: undefined
                    }
                ]
            };

            const action = {
                type: "ADD_NOTIFICATION",
                id: "TEST_NOTIFICATION",
                title: "This is a test",
                message: "Some message goes over here",
                level: "info"
            };

            const stateAfter = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    },
                    {
                        id: "GENERIC_ERROR",
                        title: "Error",
                        message: "Something went wrong. Please try again later.",
                        level: "error",
                        dismissable: true,
                        autoDismiss: undefined
                    },
                    {
                        id: "CONNECTION_LOST",
                        title: "Lost connection",
                        message: "Please check your connection. This notification will go away once you go online.",
                        level: "warning",
                        dismissable: false,
                        autoDismiss: undefined
                    }
                ]
            };

            test(Notifications, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: REMOVE_NOTIFICATION", () => {
        it("Should remove a notification given its ID", () => {
            const stateBefore = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    },
                    {
                        id: "GENERIC_ERROR",
                        title: "Error",
                        message: "Something went wrong. Please try again later.",
                        level: "error",
                        dismissable: true,
                        autoDismiss: undefined
                    },
                    {
                        id: "CONNECTION_LOST",
                        title: "Lost connection",
                        message: "Please check your connection. This notification will go away once you go online.",
                        level: "warning",
                        dismissable: false,
                        autoDismiss: undefined
                    }
                ]
            };

            const action = {
                type: "REMOVE_NOTIFICATION",
                id: "CONNECTION_LOST"
            };

            const stateAfter = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    },
                    {
                        id: "GENERIC_ERROR",
                        title: "Error",
                        message: "Something went wrong. Please try again later.",
                        level: "error",
                        dismissable: true,
                        autoDismiss: undefined
                    }
                ]
            };

            test(Notifications, stateBefore, action, stateAfter);
        });

        it("Should remove a notification given its index", () => {
            const stateBefore = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    },
                    {
                        id: "GENERIC_ERROR",
                        title: "Error",
                        message: "Something went wrong. Please try again later.",
                        level: "error",
                        dismissable: true,
                        autoDismiss: undefined
                    },
                    {
                        id: "CONNECTION_LOST",
                        title: "Lost connection",
                        message: "Please check your connection. This notification will go away once you go online.",
                        level: "warning",
                        dismissable: false,
                        autoDismiss: undefined
                    }
                ]
            };

            const action = {
                type: "REMOVE_NOTIFICATION",
                index: 1
            };

            const stateAfter = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    },
                    {
                        id: "CONNECTION_LOST",
                        title: "Lost connection",
                        message: "Please check your connection. This notification will go away once you go online.",
                        level: "warning",
                        dismissable: false,
                        autoDismiss: undefined
                    }
                ]
            };

            test(Notifications, stateBefore, action, stateAfter);
        });
    });

    describe("DEFAULT", () => {
        it("Should not change state if it does not recognise an action", () => {
            const stateBefore = {
                notificationsList: [
                    {
                        id: "TEST_NOTIFICATION",
                        title: "This is a test",
                        message: "Some message goes over here",
                        level: "info",
                        dismissable: undefined,
                        autoDismiss: undefined
                    },
                    {
                        id: "CONNECTION_LOST",
                        title: "Lost connection",
                        message: "Please check your connection. This notification will go away once you go online.",
                        level: "warning",
                        dismissable: false,
                        autoDismiss: undefined
                    }
                ]
            };

            const action = {
                type: "THIS_IS_A_LONG_NAME_FOR_AN_ACTION",
                value: 42
            };

            test(Notifications, stateBefore, action, stateBefore);
        });
    });
});
