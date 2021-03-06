import React, { PropTypes } from 'react';
import { getIEVersion } from '../../utils/browser-utils';
import baseStyles from './node-renderer.scss';
import { isDescendant } from '../../utils/tree-data-utils';

let styles = baseStyles;
// Add extra classes in browsers that don't support flex
if (getIEVersion < 10) {
    styles = {
        ...baseStyles,
        row:         `${styles.row} ${styles.row_NoFlex}`,
        rowContents: `${styles.rowContents} ${styles.rowContents_NoFlex}`,
        rowLabel:    `${styles.rowLabel} ${styles.rowLabel_NoFlex}`,
        rowToolbar:  `${styles.rowToolbar} ${styles.rowToolbar_NoFlex}`,
    };
}

const NodeRendererDefault = ({
    scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    isOver,
    canDrop,
    node,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    eye,
    className,
    style = {},
    startDrag: _startDrag,
    endDrag: _endDrag,
    ...otherProps,
}) => {

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    return (
        <div
            style={{ height: '100%' }}
            {...otherProps}
        >
            {/* {toggleChildrenVisibility && node.children && node.children.length > 0 && ( */}
            {/*     <div> */}
            {/*         <button */}
            {/*             aria-label={node.expanded ? 'Collapse' : 'Expand'} */}
            {/*             className={node.expanded ? styles.collapseButton : styles.expandButton} */}
            {/*             style={{ left: -0.3 * scaffoldBlockPxWidth }} */}
            {/*             onClick={() => toggleChildrenVisibility({node, path, treeIndex})} */}
            {/*         /> */}
            {/*  */}
            {/*         {node.expanded && !isDragging && */}
            {/*             <div */}
            {/*                 style={{ width: scaffoldBlockPxWidth }} */}
            {/*                 className={styles.lineChildren} */}
            {/*             /> */}
            {/*         } */}
            {/*     </div> */}
            {/* )} */}

            <div className={styles.rowWrapper}>
                {/* Set the row preview to be used during drag and drop */}
                {connectDragSource(
                    <div
                        className={styles.row +
                            (isDragging && isOver ? ` ${styles.rowLandingPad}` : '') +
                            (isDragging && !isOver && canDrop ? ` ${styles.rowCancelPad}` : '') +
                            (isSearchMatch ? ` ${styles.rowSearchMatch}` : '') +
                            (isSearchFocus ? ` ${styles.rowSearchFocus}` : '') +
                            (className ? ` ${className}` : '')
                        }
                        style={{
                            opacity: isDraggedDescendant ? 0.5 : 1,
                            ...style,
                        }}
                    >
                        <div className={styles.rowContents}>
                            <div className={styles.rowLabel}>
                              {eye && <span>{ eye }</span>}
                                <span
                                    className={styles.rowTitle +
                                        (node.subtitle ? ` ${styles.rowTitleWithSubtitle}` : '')
                                    }
                                >
                                    {typeof node.title === 'function' ?
                                        node.title({node, path, treeIndex }) :
                                        node.title
                                    }
                                </span>

                                {node.subtitle &&
                                    <span className={styles.rowSubtitle}>
                                        {typeof node.subtitle === 'function' ?
                                            node.subtitle({node, path, treeIndex }) :
                                            node.subtitle
                                        }
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

NodeRendererDefault.propTypes = {
    node:          PropTypes.object.isRequired,
    path:          PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    treeIndex:     PropTypes.number.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,

    scaffoldBlockPxWidth:     PropTypes.number.isRequired,
    toggleChildrenVisibility: PropTypes.func,
    buttons:                  PropTypes.arrayOf(PropTypes.node),
    className:                PropTypes.string,
    style:                    PropTypes.object,

    // Drag and drop API functions
    // Drag source
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource:  PropTypes.func.isRequired,
    startDrag:          PropTypes.func.isRequired, // Needed for drag-and-drop utils
    endDrag:            PropTypes.func.isRequired, // Needed for drag-and-drop utils
    isDragging:         PropTypes.bool.isRequired,
    draggedNode:        PropTypes.object,
    // Drop target
    isOver:  PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
};

export default NodeRendererDefault;
