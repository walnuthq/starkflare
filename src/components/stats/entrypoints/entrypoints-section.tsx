import { Table, TableBody, TableCell, TableRow } from '@/components/ui'
import { CommonTooltip } from '@/components/common/tooltip'
import { EntrypointsStackedBarChart } from '@/components/stats/entrypoints/entrypoints-stacked-bar-chart'
import { formatCompactNumber } from '@/lib/utils'
import { EntrypointData } from '@/lib/types'
import { EntrypointColors } from '@/lib/constants'

type EntrypointsSectionProps = {
  entrypoints: EntrypointData[]
}

export function EntrypointsSection(props: EntrypointsSectionProps) {
  const { entrypoints } = props

  // sort entrypoints list by amount of steps before displaying
  const sortedEntrypoints = entrypoints.sort((a, b) => b.steps - a.steps)

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto styled-scrollbar">
      {sortedEntrypoints.length !== 0 ? (
        <>
          <div className="sticky top-0 z-10 bg-white p-2 pb-0">
            <h3 className="text-md font-normal">Entrypoints</h3>

            <EntrypointsStackedBarChart
              data={sortedEntrypoints}
              className="my-3"
            />
          </div>

          <div className="p-2 pt-0">
            <Table>
              <TableBody>
                {sortedEntrypoints.map(
                  (entrypoint: EntrypointData, index: number) => (
                    <TableRow key={entrypoint.name} className="cursor-pointer">
                      <TableCell>
                        <p className="flex items-center">
                          <span
                            className="flex h-2 w-2 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                EntrypointColors[
                                  index % EntrypointColors.length
                                ],
                            }}
                          ></span>
                          {entrypoint.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        <CommonTooltip
                          asChild
                          tooltipMessage={`${entrypoint.steps.toLocaleString()} steps`}
                        >
                          <p>{`${formatCompactNumber(entrypoint.steps)} steps`}</p>
                        </CommonTooltip>
                      </TableCell>
                      <TableCell className="text-right">{`${entrypoint.usage}%`}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-md font-normal">Entrypoints</h3>
          <p className="text-sm self-center my-auto">No data available</p>
        </>
      )}
    </div>
  )
}
