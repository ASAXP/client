import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../atoms/breadcrumb';

export interface BreadCrumbProps {
  href: string;
  title: string;
}

export default function BreadCrumb(items: BreadCrumbProps[]) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((crumb) => {
          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
