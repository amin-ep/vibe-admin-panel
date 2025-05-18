import { Tabs as MuiTabs, styled, Tab } from "@mui/material";
import { createContext, useContext, useState } from "react";

type Props = { children: React.ReactNode };

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <MuiTabs
    {...props}
    TabIndicatorProps={
      {
        // children: <span className={clsx("MuiTabs-indicatorSpan")}></span>,
      }
    }
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "var(--color-blue-500)",
    position: "absolute",
    height: "100%",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab
    disableRipple
    classes={{
      root: "!text-neutral-900 md:!text-sm !text-xs dark:!text-neutral-100",
      selected: "!font-bold !bg-blue-500 !text-white",
    }}
    {...props}
  />
))(({ theme }) => ({
  textTransform: "none",
  borderRadius: "8px",
}));

const TabContext = createContext({ value: 0 } as {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
});

function Tabs({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <TabContext value={{ value: value, onChange: handleChange }}>
      <div>{children}</div>
    </TabContext>
  );
}

function TabHead({ children }: Props) {
  const { onChange, value } = useContext(TabContext);
  return (
    <StyledTabs value={value} onChange={onChange} aria-label="styled tab">
      {children}
    </StyledTabs>
  );
}

function TabItem(props: { label: string }) {
  return <StyledTab {...props} />;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
}

function CustomTabPanel({ children, index, ...other }: TabPanelProps) {
  const { value } = useContext(TabContext);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

Tabs.TabHead = TabHead;
Tabs.TabItem = TabItem;
Tabs.Panel = CustomTabPanel;

export default Tabs;
