import { ColumnIcon } from '@layer5/sistent-svg';
import React from 'react';
import { Checkbox } from '../base/Checkbox';
import { ClickAwayListener } from '../base/ClickAwayListener';
import { FormControlLabel } from '../base/FormControlLabel';
import { Paper } from '../base/Paper';
import PopperListener from './PopperListener';
import TooltipIcon from './TooltipIcon';

export interface CustomColumnVisibilityControlProps {
  columns: CustomColumn[];
  customToolsProps: {
    columnVisibility: Record<string, boolean>;
    setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  };
  style?: React.CSSProperties;
}

export interface CustomColumn {
  name: string;
  label: string;
}

export function CustomColumnVisibilityControl({
  columns,
  customToolsProps
}: CustomColumnVisibilityControlProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleColumnVisibilityChange = (columnName: string, isVisible: boolean) => {
    customToolsProps.setColumnVisibility((prevState) => ({
      ...prevState,
      [columnName]: isVisible
    }));
  };

  return (
    <React.Fragment>
      <TooltipIcon
        title="View Columns"
        onClick={handleOpen}
        icon={<ColumnIcon fill="#3c494f" />}
        arrow
      />
      <PopperListener
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-end"
        modifiers={[
          {
            name: 'flip',
            options: {
              enabled: false
            }
          },
          {
            name: 'preventOverflow',
            options: {
              enabled: true,
              boundariesElement: 'scrollParent'
            }
          }
        ]}
        // transition
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              boxShadow: open ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
              background: '#f4f5f7'
            }}
          >
            {columns.map((col) => (
              <FormControlLabel
                key={col.name}
                control={
                  <Checkbox
                    checked={customToolsProps.columnVisibility[col.name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleColumnVisibilityChange(col.name, e.target.checked)
                    }
                  />
                }
                label={col.label}
              />
            ))}
          </Paper>
        </ClickAwayListener>
      </PopperListener>
    </React.Fragment>
  );
}

export default CustomColumnVisibilityControl;
