import * as React from "react";
import { DirectoryParent } from "../types/DirectoryParent";
import { DirectoryChild } from "../types/DirectoryChild";


interface DirectoryGridProps {
  name?: string;
  description?: string;
  directoryParents?: DirectoryParent[];
  directoryChildren?: DirectoryChild[];
  relativePrefixToRoot?: string;
}


const DirectoryStateGrid = ({ name, description, directoryChildren, relativePrefixToRoot }: DirectoryGridProps) => {
  let sortedChildren;
  let childrenDivs;
  if (directoryChildren) {
    sortedChildren = directoryChildren.sort(function (a: DirectoryChild, b: DirectoryChild) {
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
    });
    childrenDivs = directoryChildren.map((child: DirectoryChild) => (
      <div key={child.slug}>
        {console.log('child entity ids', child.dm_childEntityIds)}
        <a key="uRL" href={relativePrefixToRoot + child.slug} className="font-bold text-2xl text-blue-700 hover:underline">
          {child.name} ({child.dm_childEntityIds?.length || 0})
        </a>
      </div>
    ));
  }
  return (
    <>
      <div className="section space-y-14 px-10">
        <div className="space-y-6">
          {name && <h1 className="text-3xl font-semibold text-center">{name}</h1>}
          {description && <p className="text-2xl text-center">{description}</p>}
        </div>
        {directoryChildren && (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {childrenDivs}
          </div>
        )}
      </div>
    </>
  );
};

export default DirectoryStateGrid;
